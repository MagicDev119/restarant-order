import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://api.airtable.com/v0/app13pSrFKlqNNCmM/nomenclature', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer keySqCn1Ak8686gPe'
      },
    })
    
    const { records, error } = await response.json()
    
    if (records.length) {
      res.status(200).json(records);
      res.end();
    } else {
      res.status(404);
      res.end();
    }
  } catch {
    res.status(500);
  }
};
