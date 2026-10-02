function errorHandler(err,req,res,next){
    console.error(err);

    //postgres unique constraint violation
    if(err.code === "23505"){
        return res.status(409).json({
            message: "Short code already exists"
        });
    }

    res.status(500).json({
        meassage:"Internal server error"
    });
}

module.exports= errorHandler;