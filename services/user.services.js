const User = require("../model/user.model");
class UserServices{
    async user(body){
        return await User.findOne(body);
    }
    async update(userId, body){
        return await User.findByIdAndUpdate(userId, {$set: body}, {new: true});
    }
    async delete(userId, body){
        return await User.findByIdAndUpdate(userId,body,{new: true});
    }
    async changePassword(userId, currentPassword, newPassword, confirmPassword) {
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return { success: false, message: "Current password is incorrect" };
        }

        if (newPassword !== confirmPassword) {
            return { success: false, message: "New password and confirm password do not match" };
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        await user.save();

        return { success: true, message: "Password updated successfully" };
    }
}
module.exports = UserServices;