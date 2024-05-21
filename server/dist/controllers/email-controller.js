var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
// @api - v1/email/ GET
// @desc - get emails
export const getEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const response = yield axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const messages = response.data.messages;

        const emailDetails = yield axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messages[0].id}`, {
            headers: {
            Authorization: `Bearer ${access_token}`,
            },
        });
        res.status(200).json({ status: "success", data: emailDetails, message: "email details" });
    }
    catch (e) {
        res.status(400).json({ status: "failure", message: e });
    }
});
