const axios = require('axios');
const path = require('path');
const dnsUpdateUrl = 'https://domains.google.com/nic/update';
const ipQueryUrl = 'http://ipinfo.io/ip';
const { send } = require(path.resolve(__dirname,'core','mail.js'));
const domains = ['bt.hnxlabs.com', 'plex.hnxlabs.com', 'pihole.hnxlabs.com'];

const getAuthToken = (hostname) => {
    return process.env[`${hostname.toUpperCase()}.TOKEN`];
}
const getIp = async () => {
    const ipResp = await axios.get(ipQueryUrl);
    if(ipResp.data){
        const data = ipResp.data.replace('\n','').trim();
        if(data.length <= 15 && data.length > 1){
            return data;
        }
    }
    return null;
}

const updateDnsRecord = async ()=> {
    const ip = await getIp();
    const results = [];
    domains.forEach(async (hostname) => {
        const dns = await axios({
            method: 'post',
            url: dnsUpdateUrl,
            params: {
                hostname: hostname,
                myip: ip
            },
            headers: {
                Authorization: `Basic ${getAuthToken(hostname)}`
            }
        });
        results.push(dns.data);   
    });
   
    try{
        if(process.env.SEND_DNS_MAIL === 'true'){
            await send('DNS update cron', results.join('<br/>'));
        }
        console.log(results.join('\n'));
    } catch(e){
        console.log('error while sending email.', e);
    }
}

module.exports = { updateDnsRecord };