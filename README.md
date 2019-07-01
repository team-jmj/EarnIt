# EarnIt
EarnIt is a personal finance web application. This web application is designed to keep track of the user's monthly income, tracks and categorizes user spendings, and allows the users to set a goal of how much they want to save each month. EarnIt is a simple solution to help motivate you to meet your financial goals.

The EarnIt GitHub repository can be viewed at [https://github.com/team-jmj/EarnIt](https://github.com/team-jmj/EarnIt).\
The GitHub Wiki page of EarnIt can be viewed at [https://github.com/team-jmj/EarnIt/wiki](https://github.com/team-jmj/EarnIt/wiki).\
The project documentation file of EarnIt can be viewed at [https://github.com/team-jmj/EarnIt/blob/master/README.md](https://github.com/team-jmj/EarnIt/blob/master/README.md).\
The first release of the application can be viewed at [https://github.com/team-jmj/EarnIt/releases/tag/v1.0](https://github.com/team-jmj/EarnIt/releases/tag/v1.0).

***
## Installation Instruction
* Install [Meteor](https://www.meteor.com/install)
* Download a [copy of EarnIt project](https://github.com/team-jmj/EarnIt/archive/master.zip) or clone the project using Git.
* To update packages used in the EarnIt project, go to the app directory of the project using the cd command.
* In the app directory, enter the following command
```
meteor npm install
```
* To run the project, enter the following command
```
meteor npm run start
```
* The application will be available for use in [http://localhost:3000](http://localhost:3000).

***
## Team Members
* Mai Abe
  * Completed Tasks (6/30/19):
    * Profile page bug fix (direct user to InputProfileData page when profile data is null) 
    * Some ESLint fixes on import statement orders, etc
  * Completed Tasks (6/24/19):
    * Set up InputProfileData page
    * Implement Profile page to show user data, and make it editable
    * Implement a functional Income history add/edit input and table
  * Completed Tasks (6/16/19):
    * Set up Profile Page, insert user income history table
  * Completed Tasks (6/9/19):
    * Set up landing page (create and insert background image and make the content responsive)
    * Set up Profile page, create a profile schema
  * Current Tasks:
    * Work on user income input and history on the profile page
    * Incorporate user income data into the database
    * Insert an editable profile data input section in the profile page along with the income input
* Julie Chai
  * Completed Tasks (6/30/19):
    * Implement lockout after bad signin attempts feature
    * Group user data by month and year for user home page graphs
  * Completed Tasks (6/24/19):
    * Add and update expenses and savings fields to profile and expenses field to expense categories
    * Integrate user data to User Home Page and show spendings on graph
  * Completed Tasks (6/16/19):
    * Implement forgot password & reset password features
  * Completed Tasks (6/9/19):
    * Set up app overview page
    * Set up user home page
    * Start working on login security features (forgot password)
* Jun Okabe
  * Completed Tasks (6/30/19):
    * Added 'check' package to mitigate insecure methods related to user input
    * Added 'stale-session' to cause users who were not active for 30 minutes in their current session
    * Fixed all the ESLint warnings that were still showing
    * Removed all unused files
  * Completed Tasks (6/24/19):
    * Expense Page Setup (expense catgories and the user spending) has been completed
  * Completed Tasks (6/16/19):
    * Setup Expense Page (Schema, etc.) -> Not Fully Functional
  * Completed Tasks (6/9/19):
    * Setup the design of signup page
    * Setup majority of the needed security features on the signup page, such as password requirements and the presence of a privacy policy for the new user to view
  * Current Tasks:
    * Work on the Login page (additional security features, such as prevent repeated attempts to login)
    * Work on additional security features on the Signup page

***
## Completed Tasks (6/30/19)
* Implement lockout after bad signin attempts feature
* Group user data by month and year for user home page graphs
* Code Fix using ESLint
* Added 'check' package to mitigate insecure methods related to user input

## Completed Tasks (6/24/19)
* Expense Page Functionality Completed
* Profile Page Functionality Completed 
  - InputProfileData, EditProfile pages
  - Add/Edit Income functionality and Income history table functionality
* Associate the user input data (profile and income data) to the database
* Integrate user data in user home page

## Completed Tasks (6/16/19)
* Setup Expense Page (Schema, etc.) -> Not Fully Functional yet
* Implemented forgot password and reset password features
* Insert Income history table in the profile page

## Completed Tasks (6/9/19)
* Install app template 
* Set up landing, app overview, user home, expense input, profile, and forgot password pages
* Implemented security features (discussed in our report) for the Signup Page.

## Pending Tasks
* Continue implementing security features (Two-factor authentication, etc.)

***
## Closing Thoughts
The SDL strategy is made up of phases and each of the phases consisted of mandatory security practices that allowed us to identify and mitigate possible vulnerabilities that exist in our application. Although we were not familiar with any security practices, the SDL strategy allowed us to understand the foundational concepts that are strongly recommended (or should be mandatory) in application development. By prioritizing security practices, we were able to create a better-quality application and may have reduced the possible time and resources that is needed to patch future security vulnerabilities after the release. Due to the limited time that was available during the summer session, the application is not ready to be used as a professional application (Please note that the application was developed for educational purposes). Using the experience, we acquired during developing this application, we will be able to implement better quality code in our future projects.

***
## License
* EarnIt is licensed under the Apache-2.0 License.
* For more information, please view the [LICENSE](https://github.com/team-jmj/EarnIt/blob/master/LICENSE)
