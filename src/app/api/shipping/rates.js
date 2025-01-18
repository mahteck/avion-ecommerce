// import EasyPost from '@easypost/api';

// const api = new EasyPost('YOUR_API_KEY');

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { fromAddress, toAddress, parcel } = req.body;

//         try {
//             const shipment = await api.Shipment.create({
//                 to_address: toAddress,
//                 from_address: fromAddress,
//                 parcel: parcel,
//             });

//             res.status(200).json({ rates: shipment.rates });
//         } catch (error) {
//             res.status(500).json({ error: 'Error fetching shipping rates' });
//         }
//     } else {
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// }
