import * as AWS from 'aws-sdk';

const cred = new AWS.Credentials(String(process.env.AWS_ACCESS_KEY), String(process.env.AWS_SECRET_ACCESS_KEY));
export const s3 = new AWS.S3({
  credentials: cred,
  params: {
    'Access-Control-Allow-Origin': '*'
  },
  region: 'us-east-1',
})
let s3DataContents: any;

const socialpandaParams = {
  Bucket: 'image-uploads-socialpanda',
  EncodingType: 'url',
  MaxKeys: 30
  // Prefix: '/skylines/'
}

export const s3Print = () => {
  for (const key of s3DataContents) {
    console.log(key.Key);
  }
}

export const s3ListSkylines = (params, cb) => {
  s3.listObjectsV2(params, (err, data) => {
    if(err) { console.log(err, err.stack); }
    else {
      console.log(data);
      const contents = data.Contents && data.Contents;
      s3DataContents = s3DataContents.concat(contents);
      if (data.IsTruncated) {
        params.Marker = contents&&contents[contents.length-1].Key
        s3ListSkylines(params,cb);
      }
      else {
        cb();
      }
    }
  })
}

try {
  s3ListSkylines(socialpandaParams, s3Print);
} catch(e) {
  console.log(e + "\n" + e.stack);
}
