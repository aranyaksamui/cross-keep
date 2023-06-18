// Get the home page
export const getHome = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        res.redirect("/users/dashboard");
    } else {
        console.log("User is not authenticated");
        res.render("start");
    }
};
