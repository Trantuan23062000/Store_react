const handleHello = (req,res) => {
    return res.status(200).json({
        mes:'OK'
    })

}
module.exports = {
    handleHello
}