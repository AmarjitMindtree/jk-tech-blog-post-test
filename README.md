NOTE
I have usedreal google signin by create a project in google development console, so I have client Id and client secret with me
so social login testing will take time because for this we need to have accessToken from google and facebook signin
all data I am storing in in-memory database, so reruning will loose the data

Steps to follow to test the APP

1. run command npm install
2. npm run start:dev
3. hit register API to register a user
   curl --location --request POST 'http://localhost:3000/auth/register' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "username": "johndoe",
   "password": "mysecretpassword",
   "email": "johndoe@example.com",
   "name": "John Doe"
   }'

response of register api
{
"message": "Registration successful"
}

4. data in 3 step is stored in in-memory
5. login the user u regstered with below curl
   curl --location --request POST 'http://localhost:3000/auth/login' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "password": "mysecretpassword",
   "email": "johndoe@example.com"
   }'

response:
{
"message": "Login successful",
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3ODk5NTQ4MywiZXhwIjoxNjc4OTk5MDgzfQ.flhkO_2KCQPVA1mCNn-D5bHJkAkwhZxTXZwpAMujgjA"
}

6. After step 5 we can create a blog
   using below curl
   curl --location --request POST 'http://localhost:3000/blog' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3ODk5NTQ4MywiZXhwIjoxNjc4OTk5MDgzfQ.flhkO_2KCQPVA1mCNn-D5bHJkAkwhZxTXZwpAMujgjA' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "title": "My First Blog Post",
   "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula euismod nibh non malesuada. Vestibulum vel justo eu velit rhoncus dignissim. Nam scelerisque augue id lacus venenatis, quis laoreet elit auctor. Nullam feugiat libero at arcu bibendum tempus. Etiam et nulla euismod, dictum nibh vel, sagittis augue. Nam euismod, felis in faucibus faucibus, nisi purus efficitur ante, vel blandit ipsum enim sit amet massa."
   }'

response:
{
"id": 1,
"title": "My First Blog Post",
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula euismod nibh non malesuada. Vestibulum vel justo eu velit rhoncus dignissim. Nam scelerisque augue id lacus venenatis, quis laoreet elit auctor. Nullam feugiat libero at arcu bibendum tempus. Etiam et nulla euismod, dictum nibh vel, sagittis augue. Nam euismod, felis in faucibus faucibus, nisi purus efficitur ante, vel blandit ipsum enim sit amet massa.",
"updatedAt": "2023-03-16T19:46:52.955Z",
"createdAt": "2023-03-16T19:46:52.955Z"
}

7. similary u can get the post by ID
   curl --location --request GET 'http://localhost:3000/blog/1' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3ODk5NTQ4MywiZXhwIjoxNjc4OTk5MDgzfQ.flhkO_2KCQPVA1mCNn-D5bHJkAkwhZxTXZwpAMujgjA' \
   --header 'Content-Type: application/json' \

8. delete
   curl --location --request DELETE 'http://localhost:3000/blog/1' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3ODk5NTQ4MywiZXhwIjoxNjc4OTk5MDgzfQ.flhkO_2KCQPVA1mCNn-D5bHJkAkwhZxTXZwpAMujgjA' \
   --header 'Content-Type: application/json' \
