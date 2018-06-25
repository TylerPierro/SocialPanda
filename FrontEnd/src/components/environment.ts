const dev = {
  context: 'https://50re9cfzo7.execute-api.us-east-2.amazonaws.com/dev',
  gateway: 'https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev'
}

const prod = {
  context: 'http://ec2-52-15-153-131.us-east-2.compute.amazonaws.com:3000/',
  gateway: 'https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev