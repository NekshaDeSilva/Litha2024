var userData;
const firebaseConfig = {
    apiKey: "AIzaSyCrnabpig3g3NTwg1FczcnOiPuVyIxUQ-k",
    authDomain: "lithaq-nclx.firebaseapp.com",
    databaseURL: "https://lithaq-nclx-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lithaq-nclx",
    storageBucket: "lithaq-nclx.appspot.com",
    messagingSenderId: "82810670890",
    appId: "1:82810670890:web:8792244cc769d941f0d853",
    measurementId: "G-2LJWW0Y022"
  };
  firebase.initializeApp(firebaseConfig);

  var database =firebase.database();
  

    var iVal;
    var imgVal;
    function postReach(){
    

    $('.lithaQ-profile-input-post_').on('input change', function(){
        iVal = $(this).val();
        console.log(iVal)

    });
    $('.photoAddBtn_lithaQ_jhhdh_input').on('change', function(event){

        
        const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
        const dataURL = event.target.result;
        imgVal = dataURL;
        hhd();
        console.log('Data URL:', dataURL);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

        function hhd(){
            $('.pictureDes-lithaQ-previewDiv').html('')
            .css({
                'background-image':'url('+imgVal+')'
            });
        }

    });

}
postReach();
var maxrand;


function lithaPop_cont_signIn(){
    $('.CreateAccountContext_Btn').on('click', function(){
      
        console.log('o')
        var maxrand = Math.floor(Math.random() * 890 * 859) +`ES`;
        localStorage.setItem('apiAccess', (maxrand));
        setTimeout( function(){
            window.location.href = 'https://ncloudaccounts.pages.dev/?refK=' + maxrand + '&redrct=signInwindow';
        },1000)
        
    } 
)
    
    

}
lithaPop_cont_signIn();

var refId;
var enccodec;
window.onload = function(e, l){
    retirivePostsFromFirebase();
    
    if(!urlParams.get('referenc')){
        if(localStorage.getItem('apiAccess')){
            l= localStorage.getItem('apiAccess')
        e = localStorage.getItem('userStatus');
        enccodec = CryptoJS.AES.decrypt(e, (l)).toString(CryptoJS.enc.Utf8);
        userProfileActive();
        }else{
            alert('You Have Not Signed In.')
        }
        
    }else{
        e= urlParams.get('referenc');  
        l= localStorage.getItem('apiAccess')
       enccodec = CryptoJS.AES.decrypt(e, (l)).toString(CryptoJS.enc.Utf8); 
        localStorage.setItem('userStatus', e);
        userProfileActive();
        
    }
     
}
function retrievePostLikeCount() {
    $('.lithaQ-post-syn-Lcout').each(function() {
        var postId = $(this).attr('id');
        var postIdentity = $(this);
        console.log("Post ID:", postId);

        database.ref('/posts/' + postId).once('value', function(snapshot) {
            var postData = snapshot.val();
            if (postData) {
                var likeCount = postData.postdata_.likeCount; // Assuming likeCount is the field containing the like count
                console.log("Like Count:", likeCount);
                postIdentity.text(likeCount+ ` Likes`);
            } else {
                console.log("Post with ID", postId, "not found in the database.");
            }
        });
    });
      $('.iconTray-lithaQ-actionsdiv').on('click', function(d) {
        var nowusn = $(this);
        var pids = nowusn.attr('id');
     database.ref('/posts/' + pids + '/postdata_/likeCount').transaction(function desjd(currentValue) {
            if (!currentValue) {
                return 1;
            }
            likeCountAnim(1);
            d = currentValue + 1
            return d;
        }, function(error, committed, snapshot) {
            if (error) {
                likeCountAnim(0);
            } else if (!committed) {
                // Transaction aborted
            } else {
                // Transaction committed
            }
        });
        function likeCountAnim(s) {
            if (s == 1) {
                nowusn.children().html('<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>');
            } else {
                nowusn.children().html('<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>');
            }
        }
    
       
        
    });
}

function userProfileActive(){
    
    var databaseRef = firebase.database().ref('/');


    databaseRef.orderByKey().equalTo(enccodec).once("value")
    .then(snapshot => {
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
            userData = childSnapshot.val();
      });

    console.log(userData)
    $('body').append(`<div onclick="scrollIntoViewNha(des='.lithaQ-social-cen')" class="flotingDiv-profile-previewBtnrole profilepopperDiv-role-floating" role="button" title="You"></div>`)
    $('.flotingDiv-profile-previewBtnrole').css({
        'background-image':`url(`+userData.userData.profileP+`)`
    });
    $('.profilePreview-dic-img-stlayer').attr('src', userData.userData.profileP)
    $('.AccountContext_NCloudSyndication_ span').html(userData.userData.Fname+ `..`)
    if(userData.userData.accountStatus ==1){
        $('.AccountContext_NCloudSyndication_').append(`<img data-inlinecss="yes" title="Verified Account" src="./assests/img/patch_verfied.png" style="width: 1.5rem; " class="accountNVerified_badge" alt="Verified" draggable="false" loading="lazy">`)
    }
    } else {
        alert('Something error with your sign in')
    }
  });



    

}
    function scrollIntoViewNha(des){
    document.querySelector(des).scrollIntoView();
}
var pid;
function postCurrent(){
    if(!enccodec || !iVal){
 
        $('.lithaQ-profile-input-post_').attr('placeholder', 'Please Type Something..');

    }else{
        pid = GenerateMsgId();
          var postdata_= {
           data: `<div class="lihtaQ-post radixVR-data-div"> <div class="lithaQ-post-header">     <div class="lithaQ-post-header-left">         <div class="lithaQ-post-syn-imgPro" style="background-image:url('`+userData.userData.profileP+`')" ></div>         <span class="lithaQ-post-syn-user">`+userData.userData.Fname + ` `+userData.userData.Lname +`</span>     </div>     <div class="lithaQ-post-header-cen">     `+ checkFverifiedStatusPost() +`     </div>     <div class="lithaQ-post-header-right">          <span class="lithaQ-post-syn-tme">`+checkFcurrentTime_datePost()+`</span>     </div> </div> <div class="divider-dction-mv"></div> <div class="lithaQ-post-content lithaQ-post-syn-photo" style="background-image:url(`+imgVal+`)"> </div> <div class="lithaQ-post-end">     <div class="lithaQ-box-parody" style=" width:90%; font-size:95%; flex-direction: column; justify-content:center; align-items: flex-start;">         <span class="lithaQ-post-syn-Lcout" id="`+pid+`" style="opacity: 65%;">Loading..</span>     </div>     <div class="lithaQ-box-parody">         <span class="lithaQ-post-syn-phr">`+iVal+`</span>     </div>     <div class="lithaQ-box-parody">         <div class="iconTray-lithaQ-actions">             <div data-opt="likeRaiseCountvar" class="`+enccodec+` iconTray-lithaQ-actionsdiv" id="`+ pid+`">                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">                     <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>                   </svg>             </div>                         <div onclick="openShareVoid();">                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">                     <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"></path>                   </svg>             </div>         </div>     </div> </div> </div>`
          ,likeCount:0
        }
            function GenerateMsgId(x){
       x =  Math.floor(Math.random()*889*774)+`PID`;
       return x

    }
    
    function checkFverifiedStatusPost(){
        if(userData.userData.accountStatus == 0){
            return ` `
        }else{
            return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lithaQ-post-dvv-verified" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>`
        }
    }
    function checkFcurrentTime_datePost(h){
        var dt =new Date;
        h = dt.getHours();
        return h+`H`
    }
    console.log(postdata_.data);
    database.ref(`/posts/`+pid).set({
        postdata_
    });
    $('.lithaQ-box-parody').eq(0).append(postdata_.data);
    $('.lithaQ-profile-createPost-wrap').remove();
    
}


}
var scrollUnloadBitRta = 0;
function retirivePostsFromFirebase(){
    
    var databaseRef = firebase.database().ref('/posts');


var selectedObjects = [];


databaseRef.once("value")
  .then(snapshot => {

    var dataArray = [];
    snapshot.forEach(childSnapshot => {
      var data = childSnapshot.val();
      dataArray.push(data);
    });

    var numObjectsToSelect = 5;
    for (var i = 0; i < numObjectsToSelect; i++) {
      var randomIndex = Math.floor(Math.random() * dataArray.length);
      var selectedObject = dataArray[randomIndex];
      selectedObjects.push(selectedObject);
        console.log(selectedObjects)
      dataArray.splice(randomIndex, 1);
    }


    selectedObjects.forEach(selectedObject => {
    $('.loadingDiv-postsLoAD_preload-seek').remove();
    $('.loadingDiv-postsLoadignAdd_preload-seek').remove();
      $('.lithaQ-box-parody').eq(0).append(selectedObject.postdata_.data);
      console.log(selectedObject);
      retrievePostLikeCount();
      $('.lithaQ-box-parody').eq(0).append(`<div class="loadingDiv-postsLoAD_preload-seek"></div><div class="loadingDiv-postsLoadignAdd_preload-seek" onclick="retirivePostsFromFirebase();">Load More</div>`);

    });
  })
  .catch(error => {
    console.log('error')
  });
  scrollUnloadBitRta = 1;
}


window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        $('.flotingDiv-profile-previewBtnrole').css({
            'opacity':'0%'
        })
        
}else{
    $('.flotingDiv-profile-previewBtnrole').css({
        'opacity':'100%'
    })
}
    
  });

$('.socialBar-footer-lose-landing svg').on('click', function(e){
    e = $(this).attr('id');
    window.open(e);
})
function advertiserIdRediect(adsyn){
    if(adsyn ==919){
        window.open('https://www.facebook.com/thechancesport')
    }
    if(adsyn ==6179){
        window.open('https://chancesports.lk/')
    }
}
function adSyndicateTagFill(tme){
    


        
        $('body').append(`
        <div class="adSyndicateDiv_mediaOgAd">
        <div class="AdygfSyndicate_OnPageloadDiv-video" onclick="advertiserIdRediect(adsyn = 919)">
            <video poster="./assests/adContent/cs/logo.png" src="https://adsyndicationncloud.pages.dev/mediaOgad2.mp4" class="AdygfSyndicate_OnPageloadDiv-video65" autoplay="true" ></video>
            <div class="advertiserImg_snapShot-firebaseSDK">
            <div class="advertiserImg_snapShot-firebaseSD-innerdiv">
             
                <img src="./assests/adContent/cs/logo.png" alt="advertiserLogo">
                <span>The Chance Sports • Borella</span>
            </div>
            <div class="advertiserImg_snapShot-firebaseSD-innerdiv" style="width: max-content; justify-content: flex-end; padding: 0 2.5%;">
                <div class="timeOutCountDiv-TcttxXctdyckiju6rtcvd">
                    3
                </div>
                <span class="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrFYTi">Visit</span>
            
            </div>
            </div>
        </div>
        </div>
        `);
        
        
    
    $('.AdygfSyndicate_OnPageloadDiv-video65').on('timeupdate', function() {
        getDuration();
    });
    $('.AdygfSyndicate_OnPageloadDiv-video65').on('ended', function() {
        close();
    });
    function close(){
        $('.adSyndicateDiv_mediaOgAd').remove();
    }
    function getDuration(){
            var dur  = Math.floor(document.querySelector('.AdygfSyndicate_OnPageloadDiv-video65').duration- document.querySelector('.AdygfSyndicate_OnPageloadDiv-video65').currentTime);
            $('.timeOutCountDiv-TcttxXctdyckiju6rtcvd').html(dur);
        }
}