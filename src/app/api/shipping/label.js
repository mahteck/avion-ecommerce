// import EasyPost from '@easypost/api';

// const api = new EasyPost('YOUR_API_KEY');

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { shipmentId } = req.body;

//         try {
//             const shipment = await api.Shipment.retrieve(shipmentId);
//             const label = shipment.create_shipping_label();

//             res.status(200).json({ labelUrl: label.label_url });
//         } catch (error) {
//             res.status(500).json({ error: 'Error generating shipping label' });
//         }
//     } else {
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// }
