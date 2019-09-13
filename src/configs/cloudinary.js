import { config, uploader } from 'cloudinary'

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: 'dnqtceffv',
        api_key: '796497613444653',
        api_secret: 'We2TAGrwko6E8C4t3Uemrm9kbeA'
    })
    next()
}

export { cloudinaryConfig, uploader }