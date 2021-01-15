/**
 * UploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        req.file('image').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
          },function whenDone(err, uploadedFiles) {
            if (err) {
              return res.serverError(err);
            }
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
              return res.badRequest('No file was uploaded');
            }

            Image.create({
                name: req.body.name,
                path: uploadedFiles[0].fd,                
                // Set the User's Primary Key to associate the Pet with the User.
                uploader: req.session.userId
            });
            User.find().populate('images');
            /*
            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.session.userId, {
                
            })
            
            .exec(function (err){
              if (err) return res.serverError(err);
              return res.ok();
            });*/
          });
    },

    show: async function (req, res) {
        User.findOne(req.param('id')).exec(function (err, user){
            if (err) return res.serverError(err);
            if (!user) return res.notFound();
        
            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.images) {
              return res.notFound();
            }
        
            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk(/* optional opts */);
        
            // set the filename to the same file as the user uploaded
            res.set("Content-disposition", "attachment; filename='" + file.name + "'");
        
            // Stream the file down
            fileAdapter.read(user.avatarFd)
            .on('error', function (err){
              return res.serverError(err);
            })
            .pipe(res);
          });
    }

};

