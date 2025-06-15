using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;


namespace EmployeeManagement.Infrastructure.Services
{
    public class OtpSenderService
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _whatsAppFrom;
        private readonly string _smsFrom;

        public OtpSenderService(IConfiguration config)
        {
            _accountSid = config["Twilio:AccountSid"];
            _authToken = config["Twilio:AuthToken"];
            _whatsAppFrom = config["Twilio:WhatsAppFrom"];
            _smsFrom = config["Twilio:SmsFrom"];
            TwilioClient.Init(_accountSid, _authToken);
        }

        // type: "sms" or "whatsapp"
        public async Task<string> SendMessage(string to, string message, string type)
        {
            PhoneNumber fromNumber;
            PhoneNumber toNumber;

            if (type == "whatsapp")
            {
                fromNumber = new PhoneNumber(_whatsAppFrom);
                toNumber = new PhoneNumber("whatsapp:" + to);
            }
            else if (type == "sms")
            {
                fromNumber = new PhoneNumber(_smsFrom);
                toNumber = new PhoneNumber(to);
            }
            else
            {
                throw new System.ArgumentException("Invalid message type. Use 'sms' or 'whatsapp'.");
            }

            var msg = await MessageResource.CreateAsync(
                body: message,
                from: fromNumber,
                to: toNumber
            );

            return msg.Sid;
        }
    }
}
