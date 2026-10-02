function notFound(req,res){
    res.status(404).json({
        meassage:"Route not found"
    })
}

module.exports= notFound;