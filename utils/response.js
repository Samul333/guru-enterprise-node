


function success({res,data}){

    res.status(200).send({success:true,data:data})

}


function error({res,message}){
    res.status(400).send({success:false,message})
}

module.exports = {
    success,
    error
}