const axios = require('axios');
const path = require('path');
const dnsUpdateUrl = 'https://domains.google.com/nic/update';
const ipQueryUrl = 'http://ipinfo.io/ip';
const domains = ['plex.hnxlabs.com'];

const getAuthToken = (hostname) => {
    const user = process.env[`${hostname.toUpperCase()}.USER`];
    const pass = process.env[`${hostname.toUpperCase()}.PASS`];
    const token = Buffer.from(`${user}:${pass}`).toString('base64');
    return token;
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
    log.info('dyndns: getting ip address');
    const ip = await getIp();
    log.info(`dyndns: got ip as -> ${ip}`);
    const results = [];
    for (let hostname of domains) {
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
    };
    log.info(`dyndns: done update for -> ${results.join(', ')}`);
}

module.exports = { updateDnsRecord };