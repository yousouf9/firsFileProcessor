const chokidar = require('chokidar');
const decompress = require('decompress');
const delimiterDetector = require('csv-string');
const csvParser = require('csv-parser');
const fs = require('fs');
const systemPath = require('path');

exports.BillyRonk = {

    fetchCall: async (path)=>{
 
        //await cache.clear("etisalat-sms")
        const watcher = chokidar.watch(path, {ignored: /^\./, persistent: true})

        watcher.on("add", function(filePath){
            
             let unzippedCheck = path;
              if(filePath.endsWith(".zip")){
             
                  unzippedCheck = null;
                  //unzipped the files once available
                decompress(filePath, `${path}//unzipped`).then(async(files) => {
                  const fileLength = files.length
                  let counter = 0;
                  console.log(fileLength, counter) 
                  //traversing through each file
                  for await(let file of files){
                    counter = counter + 1

                   //  console.log(file.path.endsWith(".txt"));

                      if(file.path.endsWith(".txt") || file.path.endsWith(".csv")){

                         fs.readFile(`${path}//unzipped//${file.path}`, (err, data)=>{
                             if(err) console.error(err)

                             //detect file type and to use for convertion
                             const type = delimiterDetector.detect(data.toString("utf8"))
                             // console.log("Stop here", type);

                              
                              fs.createReadStream(`${path}//unzipped//${file.path}`)
                                .pipe(csvParser({ separator: type}))
                                .on('data', async (data) =>  await cache.lpushAsync("billy-mtn-call", JSON.stringify(data))   ) 
                                .on('end', () => {
                                    console.log("Done");
                                    //ReplyError: WRONGTYPE Operation against a key holding the wrong kind of value
                                    // [
                                    //   { NAME: 'Daffy Duck', AGE: '24' },
                                    //   { NAME: 'Bugs Bunny', AGE: '22' }
                                    // ]
                                  
                                    if(filePath){
                                        let today = new Date();
                                        const mypath = systemPath.join(__dirname, '..', '/taxaudit/billyronk/processed')
                                        const newFolderName =  `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}--${Math.floor(Date.now() / 1000)}`
                                        const finalPath = systemPath.join(mypath, `/${newFolderName}`)
                                        const baseName = systemPath.basename(filePath);
                                        const dest = systemPath.resolve(finalPath, baseName)
                                            
                                        fs.mkdir(finalPath, {recursive:true}, (err)=>{
                                                if(err) console.log(err);
                                        })
                                        //remove recently added file
                                        fs.rename(filePath, dest, (err, result) => {
                                            if(err) console.error(err);
                                            //result after moving documents
                                            console.log("Done");
                                        })
                                    }
                                });
                         })
                          
                         //
                      }
                  }

                  //deleted zipped file whne counter matched and reset it
                  if(counter === fileLength){
                    fs.rm(`${path}//unzipped`, {recursive:true}, (err)=>{
                        if(err) console.log(err);
  
                        console.log(`${path}//unzipped` + "is deleted");
                    })

                    counter = 0;
                  }

           
                
           
                }).catch(err => console.log(err))
              
            
            
            
            }else{
                if(filePath.endsWith(".txt") || filePath.endsWith(".csv") ){

                    fs.readFile(`${filePath}`, (err, data)=>{
                        if(err) console.error(err)

                        console.log("Insert", data);
                        //detect file type and to use for convertion
                        const type = delimiterDetector.detect(data.toString("utf8"))
                        // console.log("Stop here", type);

                         
                         fs.createReadStream(`${filePath}`)
                           .pipe(csvParser({ separator: type}))
                           .on('data', async (data) =>  await cache.lpushAsync("billy-mtn-call", JSON.stringify(data))   ) 
                           .on('end', async () => {
                              
                               //ReplyError: WRONGTYPE Operation against a key holding the wrong kind of value
                               // [
                               //   { NAME: 'Daffy Duck', AGE: '24' },
                               //   { NAME: 'Bugs Bunny', AGE: '22' }
                               // ]
                                    //check if file path exit and move it
                                 console.log(path, filePath)
                            if(unzippedCheck){
                                let today = new Date();
                                const mypath = systemPath.join(__dirname, '..', '/taxaudit/billyronk/processed')
                                const newFolderName =  `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}--${Math.floor(Date.now() / 1000)}`
                                const finalPath = systemPath.join(mypath, `/${newFolderName}`)
                                const baseName = systemPath.basename(filePath);
                                const dest = systemPath.resolve(finalPath, baseName)
                                    
                                fs.mkdir(finalPath, {recursive:true}, (err)=>{
                                        if(err) console.log(err);
                                })
                                //remove recently added file
                                fs.rename(filePath, dest, (err, result) => {
                                    if(err) console.error(err);
                                    //result after moving documents
                                    console.log("Done");
                                })
                            }

                           });
                    })
                     
                    //
                 }
            }

        




        })
        
        
        
        watcher.on("change", function(path){
            console.log("path", path, )
        })
        
        
        watcher.on("error", function(path){
            console.log("Err", "path", path,)
        })

  
    },
}