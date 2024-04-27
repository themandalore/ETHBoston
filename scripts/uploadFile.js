const fs = require('fs').promises;


async function main(){
    const data = await fs.readFile('./secret.txt', 'utf8'); //nodejs specific
    const response = await fetch('https://api.akord.com/files', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Api-Key': 'your_api_key',
            'Content-Type': 'text/plain'
        },
        body: data
    })
    
    console.log(response)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
