// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
export const suppressECRAuth = {
  'id': 'F4',   
  'reason': 'There is no resource associated with ecr:GetAuthorizationToken.'
}