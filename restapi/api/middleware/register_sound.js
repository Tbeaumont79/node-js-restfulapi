const player = require('play-sound')(opts = {})

module.exports = (req, res, next) => {
    player.play('./media/alert.mp3', (err) => {
        if (err)
        {
            res.status(500).json({
                message: "error when adding the user ! "
            })
        } else {
            res.status(200).json({
              message: "user succefully added ! "
            })
            next()
        }
    })
}