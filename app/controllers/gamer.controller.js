import logger from '../helpers/logger.js'
import { HTTP_CODES } from '../globals.js'
import Gamer from '../models/gamer.model.js'

const create = async (req, res) => {
    const { email, tag, password } = req.body
    logger.log(`gamer-create -> gamer registration for: ${email}`)

    if (!email) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid email'
        })
    }

    if (!tag) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Please enter a valid gamer tag'
        })
    }

    if (!password) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: 'Password cannot be empty. Please enter a password'
        })
    }

    logger.log(`gamer-create -> gamer registration data validation successful for: ${email}`)

    /* Promise chain that does the following
        - check if the gamer exists
        - if gamer exists, notify gamer to login instead
        - if gamer does not exist, create the gamer
        - notify gamer that their account was created successfully
    */
    return new Promise((resolve, reject) => {
    logger.log(`gamer-create -> Checking if gamer exists already: ${email}`)

        //check if the user exists
        Gamer.findOne({ email }, (error, existingUser) => {
            if (error) {
                console.log('findOne error', error);

                return reject({
                    status: HTTP_CODES.SERVER_ERROR,
                    message: 'Something went wrong. Please try again later',
                });
            }

            // if user exists, inform user to login instead
            if (existingUser) {
                logger.log(`gamer-create -> user with ${email} already exists`)
                return reject({
                    status: HTTP_CODES.BAD_REQUEST,
                    message: 'Gamer with the email already exists',
                });
            }

            // if user does not exist, proceed to create user
            return resolve();
        });
    })
    .then(() => new Promise(async (resolve, reject) => {
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        Gamer.create(
            {
                tag,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            },
            (error, savedGamer) => {
                if (error) {
                    logger.log(`gamer-create -> encounter an error while creating gamer profile: ${email}`)
                    console.log('create error', error);

                    return reject({
                        status: HTTP_CODES.SERVER_ERROR,
                        message: 'Something went wrong. Please try again later',
                    });
                } else {
                    logger.log(`gamer-create -> Successfully created gamer profile for: ${email}`)
                    resolve({
                        ...savedGamer,
                    });
                }
            }
        );
    }))
    .then((gamer) => {
        delete gamer['password'];

        return res.status(HTTP_CODES.OK)
        .json({
            success: true,
            data: gamer
        });
    })
    .catch((error) => {
        logger.log(`gamer-create -> Failed to create gamer profile for: ${email}`)
        return res.status(error.status || HTTP_CODES.SERVER_ERROR)
        .json({
            success: false,
            message: error.message || 'Oops... Something went wrong during your registration. Please try again later'
        });

    })
}

export { create }