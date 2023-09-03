Feature: User login on santa website
    Feature Description
Scenario: User logs in sucсessfuly
Given user is on secret santa login page
        # //When user logs in as "testdmirr@gmail.com" and "test2077"
When user logs in as "<login>" and "<password>"        
#  When user logs in with table
#         | login              | password |
#         | testdmirr@gmail.com | test2077 |
        
Then user is on dashboard page
Examples:
    | login              | password |
    | testdmirr@gmail.com | test2077 |
    | testdmirr+test1@gmail.com | test2077 |
    # | testdmirr+test2@gmail.com | test2077 |