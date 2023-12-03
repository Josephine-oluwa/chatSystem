"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFriend = exports.makeFriends = exports.findAllAuth = exports.signInAuth = exports.findOneAuth = exports.createAuth = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const createAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, password } = req.body;
        const auth = yield authModel_1.default.create({
            email, userName, password
        });
        return res.status(201).json({
            message: "successfully created auth",
            data: auth
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error while creating auth"
        });
    }
});
exports.createAuth = createAuth;
const findOneAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        return res.status(200).json({
            message: "successfully found one auth",
            data: auth
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error while creating auth"
        });
    }
});
exports.findOneAuth = findOneAuth;
const signInAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.params;
        const auth = yield authModel_1.default.findOne({ email });
        return res.status(200).json({
            message: "successfully signed up",
            data: auth
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error while creating auth"
        });
    }
});
exports.signInAuth = signInAuth;
const findAllAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(201).json({
            message: "successfully found all auth",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error while creating auth"
        });
    }
});
exports.findAllAuth = findAllAuth;
const makeFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID, friendID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const friend = yield authModel_1.default.findById(friendID);
        if (auth && friend) {
            if (auth.friend.some((el) => el === friendID)) {
                return res.status(404).json({
                    message: "you are already friends now"
                });
            }
            else {
                let authPush = [...auth.friend, authID];
                let friendPush = [...friend.friend, authID];
                const makeFri = yield authModel_1.default.findByIdAndUpdate(authID, {
                    friend: authPush,
                }, { new: true });
                const newAuth = yield authModel_1.default.findByIdAndUpdate(friendID, {
                    friend: friendPush
                }, { new: true });
                return res.status(200).json({
                    message: "you are now friends",
                    data: { makeFri, newAuth }
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error"
        });
    }
});
exports.makeFriends = makeFriends;
const unFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID, friendID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const friend = yield authModel_1.default.findById(friendID);
        if (auth && friend) {
            const makeFri = yield authModel_1.default.findByIdAndUpdate(authID, {
                friend: auth.friend((el) => el !== friendID)
            }, { new: true });
            const newAuth = yield authModel_1.default.findByIdAndUpdate(friendID, {
                friend: friend.friend.filter((el) => el !== authID)
            }, { new: true });
            return res.status(201).json({
                message: "you are now friend",
                data: { makeFri, newAuth }
            });
        }
        else {
            return res.status(201).json({
                message: "something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "successful"
        });
    }
});
exports.unFriend = unFriend;
