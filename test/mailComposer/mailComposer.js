this.mailComposerTests = {
    'Create mailComposer object': function(test) {
        var mc = mailComposer();
        test.ok(true, mc instanceof mailComposer);
        test.done();
    },

    'bodyTree: plaintext': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        test.deepEqual(mc._buildBodyTree(), {"contentType":"text/plain","content":"text"});
        test.done();
    },

    'bodyTree: html': function(test){
        var mc = mailComposer();
        mc.setHTMLBody("html");
        test.deepEqual(mc._buildBodyTree(), {"contentType":"text/html","content":"html"});
        test.done();
    },

    'bodyTree: attachment': function(test){
        var mc = mailComposer();
        mc.addAttachment({content: "test"});
        test.deepEqual(mc._buildBodyTree(), {"attachment":{"content":"test"}});
        test.done();
    },

    'bodyTree: plaintext and html': function(test){
        var mc = mailComposer();
        mc.setHTMLBody("html");
        mc.setTextBody("test");
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/alternative","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"contentType":"text/html","content":"html"}]});
        test.done();
    },

    'bodyTree: plaintext and attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.addAttachment({content: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"attachment":{"content":"test"}}]});
        test.done();
    },

    'bodyTree: plaintext and several attachments': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.addAttachment({content: "test1"});
        mc.addAttachment({content: "test2"});
        mc.addAttachment({content: "test3"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"attachment":{"content":"test1"}},{"attachment":{"content":"test2"}},{"attachment":{"content":"test3"}}]});
        test.done();
    },

    'bodyTree: plaintext and cid attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"attachment":{"content":"test", "contentId": "test"}}]});
        test.done();
    },

    'bodyTree: plaintext and attachment and cid attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.addAttachment({content: "test"});
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"attachment":{"content":"test"}},{"attachment":{"content":"test", "contentId": "test"}}]});
        test.done();
    },

    'bodyTree: html and attachment': function(test){
        var mc = mailComposer();
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"text/html","content":"html"},{"attachment":{"content":"test"}}]});
        test.done();
    },

    'bodyTree: html and cid attachment': function(test){
        var mc = mailComposer();
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/related","multipart":true,"childNodes":[{"contentType":"text/html","content":"html"},{"attachment":{"content":"test","contentId":"test"}}]});
        test.done();
    },

    'bodyTree: html and attachment and cid attachment': function(test){
        var mc = mailComposer();
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"multipart/related","multipart":true,"childNodes":[{"contentType":"text/html","content":"html"},{"attachment":{"content":"test","contentId":"test"}}]},{"attachment":{"content":"test"}}]});
        test.done();
    },

    'bodyTree: plaintext and html and attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"multipart/alternative","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"contentType":"text/html","content":"html"}]},{"attachment":{"content":"test"}}]});
        test.done();
    },

    'bodyTree: plaintext and html and cid attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/alternative","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"contentType":"multipart/related","multipart":true,"childNodes":[{"contentType":"text/html","content":"html"},{"attachment":{"content":"test","contentId":"test"}}]}]});
        test.done();
    },

    'bodyTree: plaintext and html and attachment and cid attachment': function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._buildBodyTree(), {"contentType":"multipart/mixed","multipart":true,"childNodes":[{"contentType":"multipart/alternative","multipart":true,"childNodes":[{"contentType":"text/plain","content":"text"},{"contentType":"multipart/related","multipart":true,"childNodes":[{"contentType":"text/html","content":"html"},{"attachment":{"content":"test","contentId":"test"}}]}]},{"attachment":{"content":"test"}}]});
        test.done();
    },

    flattenBodyTree: function(test){
        var mc = mailComposer();
        mc.setTextBody("test");
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        mc.addAttachment({content: "test", contentId: "test"});
        test.deepEqual(mc._flattenBodyTree(), [{"boundary":0,"contentType":"multipart/mixed","multipart":true,"boundaryOpen":1},{"boundary":1,"contentType":"multipart/alternative","multipart":true,"boundaryOpen":2},{"boundary":2,"contentType":"text/plain","content":"text"},{"boundary":2,"contentType":"multipart/related","multipart":true,"boundaryOpen":3},{"boundary":3,"contentType":"text/html","content":"html"},{"boundary":3,"attachment":{"content":"test","contentId":"test"}},{"boundaryClose":3},{"boundaryClose":2},{"boundary":1,"attachment":{"content":"test"}},{"boundaryClose":1}]);
        test.done();
    },

    'pause and resume': function(test){
        var mc = mailComposer(),
            paused = true;
        mc.setTextBody("test");
        mc.setHTMLBody("test");
        mc.addAttachment({content: "test"});
        mc.addAttachment({content: "test", contentId: "test"});

        mc.ondata = function(chunk){
            test.ok(!paused);
            mc.suspend();
            paused = true;
            setTimeout(function(){
                paused = false;
                mc.resume();
            }, 20);
        };

        mc.onend = function(){
            test.done();
        };

        mc.suspend();
        mc.stream();

        setTimeout(function(){
            paused = false;
            mc.resume();
        }, 20);
    },

    'generateHeader': function(test){
        var mc = mailComposer();
        mc.setHeader("test1", "abc");
        mc.setHeader("test2", "def");
        mc.setHeader("test3", "def");
        mc.setHeader("test3", ["ghi", "jkl"]);
        test.deepEqual(mc._generateHeader(), "Test3: jkl\r\n"+
                                             "Test3: ghi\r\n"+
                                             "Test2: def\r\n"+
                                             "Test1: abc\r\n"+
                                             "MIME-Version: 1.0");
        test.done();
    }

};