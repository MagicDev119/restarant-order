import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

var base = new Airtable({apiKey: 'keySqCn1Ak8686gPe'}).base('app13pSrFKlqNNCmM');
export default async (req: NextApiRequest, res: NextApiResponse) => {

  base('order_details').create([
    {
      "fields": JSON.parse(req.body).fields
    }
  ], function(err: any, records: any) {
    if (err) {
      res.status(500);
      res.end();
      return;
    }
    const orderId = records[0].getId();
    const carts = JSON.parse(req.body).carts;
    const orderItems: Array<any> = [];
    Object.keys(carts).map((key) => {
      if (key !== "totalItems" && key !== "totalPrice") {
        orderItems.push({
          "fields": {
            "order_id": [
              orderId
            ],
            "quantity": carts[key].count + "",
            "nomenclature_id": [
              key
            ]
          }
        })
      }
    });

    base('order_items').create(orderItems, function(itemErr: any, itemRecords: any) {
      if (itemErr) {
        res.status(500);
        res.end();
        return;
      }
      const orderItemIds: Array<string> = [];
      itemRecords.forEach(function (itemRecord: any) {
        console.log(itemRecord.getId());
        orderItemIds.push(itemRecord.getId())
      });

      base('order_details').update([
        {
          "id": orderId,
          "fields": {
            "order_items": orderItemIds
          }
        }
      ], function(updateErr: any, updateRecords: any) {
        if (updateErr) {
          res.status(500);
          res.end();
          return;
        }
        res.status(200).json({msg: 'success'});
        res.end(); 
      });
    });
  });
  // try {
  //   console.log('------------')
  //   const response = await fetch('https://api.airtable.com/v0/app13pSrFKlqNNCmM/order_details', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Bearer keySqCn1Ak8686gPe',
  //       'content-type': 'application/json;charset=UTF-8'
  //     },
  //     body: JSON.stringify([{
  //       fields: req.body.fields
  //     }])
  //   })
  //   console.log('records')
  //   console.log(response)
    
  //   const { records, error } = await response.json()
  //   console.log(records)
  //   console.log(error)

  //   if (records.length) {
  //     res.status(200).json(records);
  //     res.end();
  //   } else {
  //     res.status(404);
  //     res.end();
  //   }
  // } catch {
  //   console.log('error')

  //   res.status(500);
  // }
};
