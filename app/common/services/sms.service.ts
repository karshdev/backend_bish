import axios from 'axios';

export const sendSequentialSMS = async (mobile:string,bishCode:string) => {

   const sms1 = `Welcome to BISH! Your home's BISH! code for 2025 is ${bishCode}. More info in next text.`;
  const sms2 = "Now you've got your home's BISH! code\nyou're all set to book a plumber at your home's\nexclusive price for 2025. Please call 085645437 to\ntell us about your job.";

  const config = {
    auth: {
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const firstSMSPayload = {
      messages: [{
        body: sms1,
        to: mobile,
        from: process.env.MOBILE_NUMBER
      }]
    };

    const firstResponse = await axios.post(
      `${process.env.SMS_URL}/v3/sms/send`,
      firstSMSPayload,
      config
    );

    console.log('First SMS sent successfully');

    await new Promise(resolve => setTimeout(resolve, 10000));

    const secondSMSPayload = {
      messages: [{
        body: sms2,
        to: mobile,
        from: process.env.MOBILE_NUMBER
      }]
    };

    const secondResponse = await axios.post(
    `${process.env.SMS_URL}/v3/sms/send`,
      secondSMSPayload,
      config
    );

    console.log('Second SMS sent successfully');

    return {
      firstSMS: firstResponse.data,
      secondSMS: secondResponse.data
    };

  } catch (error:any) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};
export const generateBishCode = (): string => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};


