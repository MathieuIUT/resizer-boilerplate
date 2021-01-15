/**
 * UploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        req.file('picture').upload({
          maxBytes: 50000000,
          adapter: require('skipper-disk'),
        }, async function whenDone(err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
  
        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }

        let file = uploadedFiles[0];

        Image.create({
            name: file.filename,
            path: file.fd,                
            // Set the User's Primary Key to associate the Pet with the User.
            owner: req.user.id
        }).exec(function (err){
          if (err) return res.serverError(err);
          return res.redirect('/');
        })
        //User.find().populate('image');
      });
    },

    show: async function (req, res) {
        Image.findOne(req.param('id')).exec((err, img)=>{
        if (err) return res.serverError(err);
        if (!img) return res.notFound();
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk(/* optional opts */);

        // set the filename to the same file as the user uploaded
        res.set("Content-disposition", "attachment; filename='" +img.path+ "'");

        // Stream the file down
        fileAdapter.read(img.path)
        .on('error', (err)=>{
          return res.serverError(err);
        })
        .pipe(res);
      });
    }

};

