# Email Challenge:

### _Technologies:_

  •  TypeScript (Node.js)   
  
  •  Express
  
  •  Authentication: JWT
  
  •  Test: jest and supertest
      
  •  Database: PostgreSQL


### _Endpoints:_

    /api/user/registerUser: 
  Should send the name, email, password (8 chars or longer) and the role (ADMIN or USER).
  ##
    
    /api/user/loginUser:
  Should send the email and the password. A token would be generated if the log in was succesful.  
  ##
    
    /api/email/sendEmail:
  Should send the receiver email, the title (required) and the content of the mail that may be empty. To send an email you should be authenticated.
  ##
    
    /api/admin/stats:
  Should be an admin who triggers the endpoint, if not an admin you would not get access to the stats. 
  ##
    
    /api/swagger:
  In this endpoint you would be able to see the swagger that specifies all the endpoints and the parameters they need to work.
  
   

### _Commands:_
      
    •  npm run dev: 
  To run the api
  ##
    •  npm test: 
  To run all tests
