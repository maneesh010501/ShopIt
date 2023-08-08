import { createClient } from 'redis';

const client = createClient({
    password: 'mfMT5Kh6aJA7l2WlmakLyccxwxzfrOWc',
    socket: {
        host: 'redis-17353.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17353
    }
});