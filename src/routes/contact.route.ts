import { Router, Request, Response } from 'express';
import { sendContactEmail } from '../config/emailConfig';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await sendContactEmail(name, email, message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
