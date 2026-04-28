export default function ClickJack() {
    return (
       <html>
        <head>
            <title>Clickjack Test page</title>
        </head>
        <body>
            <iframe src="https://www.target.site" style={{ width: '500px', height: '500px' }}></iframe>
        </body>
       </html>
    );
}