# Git-Verbosity
We all know that writing detailed commit messages are important. This app allows you to enter a Github username, and then displays a bar chart of the average length of their and their friends' commit messages!

[How verbose are you?](http://jpqy.github.io/git-verbosity)

## About the project
This project was created in under 5 hours as part of Mintbean's Careerhack Hackathon. The goal was to build something that uses GitHub's API.

[LinkedIn Post](https://www.linkedin.com/posts/jpqy_mintbean-careerhack-hackathon-git-verbosity-activity-6680959517867433984-gDCu)

## Technical challenges
* The app first makes a call to the `/users/.../followers` API endpoint to retrieve a list of people the user is following
* For each user, the app uses the `/users/.../repo` endpoint to randomly pick 5 repositories (worried about API limits)
* For each repo, the `/repos/.../.../commits` endpoint retrieves the first few commit messages
* The data is processed and used in the charting library

## Screenshots
![Main](https://raw.githubusercontent.com/jpqy/git-verbosity/master/public/img/og.png)
&nbsp;

### Built With
* [React](https://reactjs.org/)
* [amCharts](https://www.amcharts.com/)
* [GitHub API](https://developer.github.com/v3/)

