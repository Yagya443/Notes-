const express=require('express')

const app=express();

app.use(express.json());

let notes=[]

app.get("/",(req,res)=>{
    res.send("Server Is Running")
})

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.post("/notes", (req, res) => {
    console.log("BODY:", req.body); // 👈 IMPORTANT

    const note = req.body;
    notes.push(note);

    res.json({ message: "Note added", notes });
});


app.delete("/notes/:index", (req, res) => {
    const index = req.params.index;
    notes.splice(index, 1);
    res.json({ message: "Deleted", notes });
});

app.listen(3000,()=>{
    console.log('Server Running at 3000');
})