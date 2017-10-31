# team-press-release

A small lib to automate sending weekly catchup emails to the team

## Getting started

#### 1. Clone the repo to your pc or run:

```
git clone https://github.com/etiennemarais/team-press-release.git
```

#### 2. Make sure you have `yarn` installed then run it inside of the directory:

```
yarn install
```

#### 3. To send a mail you can edit the `<team>-weekly-catchup.mjml` file in the project root. Icons are a treat. I upload free to use icons to an open github issue so I can use that url in my email template since inlining of images does not work. I use this repo (https://icons8.com/icon/new-icons)

#### 4. VSCode has a nice [plugin](https://github.com/attilabuti/vscode-mjml), (https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml) to view the template result as you type it. 

#### 5. Set Sendgrid env file

In your project root you need to set the .env file for the `SENDGRID_API_KEY`

#### 6. Run

```bash
# Test send a mail to yourself Available options
yarn test "Some Subject here"

# Send to team but using your own template, this will add all the config recipients
yarn send "Some Subject here"

# Render the template only as an html file
yarn render
```

### Icons

<a href="https://icons8.com">Icon pack by Icons8</a> You should check them out, it's a great resource.
