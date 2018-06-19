import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
aws.config.update(awsConfig);
// const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient(); // subset of functionality of dynamodb

// var params = {
//     TableName : 'Messages',
//     Item: {
//         Location: "Tampa",
//         Tag: "Night Life",
//         messages: [
//           {
//             user: "Ferdinand",
//             box: "I joined the group.",
//             time: Date.parse("January 1, 2018, 3:45 PM")
//           },
//           {
//             user: "Eric",
//             box: "I also joined.",
//             time: Date.parse("January 1, 2018, 4:00 PM")
//           }
//         ]
//   }
// }


// Params for Query -EF
var paramsx = {
  TableName: 'Messages',
  KeyConditionExpression: '#l = :hkey',
  ExpressionAttributeNames: {"#l": "Location"},
  ExpressionAttributeValues: {
    ':hkey': 'Tampa',
  }
};


var groups = {
  TableName : 'Groups',
  Item: {
      Location_Tag: "Tampa-NightLyfe",
      Users: "Tyler",
  }
}

// docClient.put(groups, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// docClient.put(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// let time = new Date(params.Item.messages[0].time).toLocaleString('en', {});

var params = {
  TableName : 'Messages',
  Item: {
      Location: "Tampa",
      Tag: "Night Life",
      messages: [
        {
          user: "Blake",
          box: "I am a teacher.",
          time: Date.parse("January 1, 2018, 4:30 PM")
        }
      ]
}
}

docClient.update({
  TableName: 'Messages',
  Key: {
    Location: params.Item.Location,
    Tag: params.Item.Tag
  },
  UpdateExpression: 'ADD #messages :message',
  ExpressionAttributeNames: { "#messages" : "messages" },
  ExpressionAttributeValues: { ":message" : docClient.createSet([JSON.stringify(params.Item.messages)]) }
}, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
})



// DocClient For Query -EF
docClient.query(paramsx, function(err, data) {
  console.log("Data Queried")
  console.log(data)
  if (err) console.log(err);
  else console.log(data);
});




// createGroup(group1);
// export function findAllByYear(year: number): Promise<any> {
//   return docClient.query({
//     TableName: 'movies',
//     KeyConditionExpression: '#yr = :yyyy',
//     ExpressionAttributeNames: { // for aliasing field names
//       '#yr': 'year'
//     },
//     ExpressionAttributeValues: { // for aliasing actual values
//       ':yyyy': year
//     },
//     // ReturnConsumedCapacity: 'TOTAL' // not needed but if you want to see this info it is there
//   }).promise();
// }
// export function findByYearAndTitle(year: number, title: string): Promise<any> {
//   return docClient.get({
//     TableName: 'movies',
//     Key: {
//       year: year,
//       title: title
//     }
//   }).promise();
// }
// export function update(movie): Promise<any> {
//   return docClient.update({
//     TableName: 'movies',
//     Key: {
//       year: movie.year,
//       title: movie.title
//     },
//     UpdateExpression: 'set #rat = :r, #desc = :desc',
//     ExpressionAttributeNames: {
//       '#desc': 'description',
//       '#rat': 'rating'
//     },
//     ExpressionAttributeValues: {
//       ':r': movie.rating,
//       ':desc': movie.description
//     },
//     ReturnValues: 'UPDATED_NEW'
//   }).promise();
// }