require('dotenv').config();
const axios = require('axios');
const dnsUpdateUrl = 'https://domains.google.com/nic/update';
const ipQueryUrl = 'http://ipinfo.io/ip';
const { send } = require('./mail-core');

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
    const dns1 = await axios({
        method: 'post',
        url: dnsUpdateUrl,
        params: {
            hostname: 'bt.hnxlabs.com',
            myip: ip
        },
        headers: {
            Authorization: `Basic ${process.env.DYNDNS_AUTH_1}`
        }
    });
    const dns2 = await axios({
        method: 'post',
        url: dnsUpdateUrl,
        params: {
            hostname: 'plex.hnxlabs.com',
            myip: ip
        },
        headers: {
            Authorization: `Basic ${process.env.DYNDNS_AUTH_2}`
        }
    });

    try{
        await send('DNS update cron', `${dns1.data}<br />${dns2.data}<br />`);
    } catch(e){
        console.log('error while sending email.', e);
    }
}

updateDnsRecord();