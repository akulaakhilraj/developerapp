# list of Apis followed to build Dev Tinder App

# STATUS APPROVAL
--- Interested
--- Ignored
--- Accepted
--- Rejected

 # AuthRouter
--- POST signup/
--- POST login/
--- POST logout/

# When user Logined in and see  all the users 

# profileRouter
    See all the list of profile users 
    
--- GET profile/view  
--- PATCH profile/edit 
--- PATCH profile/password 

### (If your interested in any profile or not and If you accept it or reject it) ###

# connectionRequestRouter
--- POST request/send/interested/:usedId
--- POST request/send/ignored/:userid
--- POST request/review/accepted/:requestId
--- POST request/review/rejected/:requestId

# userRouters
--- GET user/connections/
--- GET user/request/received
--- GET user/feed/
