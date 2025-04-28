/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                black: '#000000',
                white: '#ffffff',
                softPurple: '#cfcfff',
                lightPurple: '#f1f0ff',
                yellowSoft: '#fae37d',
                lightBlue: '#c3ebfa',
                graySoft: '#686e92',
                graybackground: '#f7f8fa',
                borderSubtleGray:'#ECECEC',
                disabledButton: '#bebebe',
            }
        },
    },
    plugins: [],
}
