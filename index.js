const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT||3000;

app.post('/bfhl',(req, res) => {
  try {
    const {data}=req.body;
    
    const user = {
      full_name:"ashita_chhabra", 
      dob: "04032004", 
      email:"chhabraashita4@gmail.com",
      roll_number:"2210991405",
    };

    let even_numbers = [],odd_numbers=[],alphabets=[],special_characters = [];
    let sum=0;
    let concat_alpha="";

    data.forEach(item =>{
      const strItem = String(item);
      if (/^[0-9]+$/.test(strItem)) {
        const num=parseInt(strItem);
        sum += num;
        (num % 2===0? even_numbers:odd_numbers).push(strItem);
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
        concat_alpha += strItem;
      } else {
        special_characters.push(strItem);
      }
    });

    
    let reversed=concat_alpha.split("").reverse().map((ch, i) =>
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");

    const response={
      is_success:true,
      user_id: `${user.full_name}_${user.dob}`,
      email:user.email,
      roll_number:user.roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: reversed
    };

    res.status(200).json(response);
  } catch(err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});
