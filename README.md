# task-master
Task Master for Tech Series Ellipsis 2023

## Prerequisites

- Node.js version 16.17.1
- npm version 9.4.1

You can try downgrading the versions to match above if npm start produces error regarding versions

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jordianrenaldi/taskMaster.git
    ```

2. Navigate to the project directory:

    ```bash
    cd taskMaster
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To run the project, execute the following command in the project directory:

```bash
npm start
```

## Troubleshooting

**1. Package.json Script Modifications**<br>
In your package.json file under the scripts section, change start and build to include/remove --openssl-legacy-provider as deemed fit

```javascript
"scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```
or 
```javascript
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

**2. Missing Modules**<br>
If you encounter missing modules, you can download them using the following command:
```bash
npm install @mui/icons-material @mui/material openai @emotion/react @emotion/styled
```
