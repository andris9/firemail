this.mailParserTests = {

    "Create mailParser instance, load test file": function(test){
        loadParserTestFile("M1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            test.ok(true, mc instanceof mailParser);
            test.done();
        });
    },

    "M1": function(test){
        loadParserTestFile("M1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {subject:"M1", 'mime-version':"1.0 (Generated by hand by paf@swip.net)", to:"(requester of the test)", from:"mimetest-human@imc.org"});
            test.equal(tree.body, "  M1\n    Always generate a \"MIME-Version: 1.0\" header field.\n\n\n");

            test.done();
        });
    },

    "M1-1": function(test){
        loadParserTestFile("M1-1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"subject":"M1-1","mime-version":"1.0","to":"(requester of the test)","from":"mimetest-human@imc.org"});
            test.equal(tree.body, "  M1\n    Always generate a \"MIME-Version: 1.0\" header field.\n\n\n");

            test.done();
        });
    },

    "M1-2": function(test){
        loadParserTestFile("M1-2", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"subject":"M1-2","mime-version":"2.0 (Generated by hand by paf@swip.net)","to":"(requester of the test)","from":"mimetest-human@imc.org"});
            test.equal(tree.body, "  M1\n    Always generate a \"MIME-Version: 1.0\" header field.\n\n    Note that the MIME-version for this message is 2.0.\n\n");

            test.done();
        });
    },

    "firemail-latin_13": function(test){
        loadParserTestFile("firemail-latin_13", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0 (Generated by hand by paf@swip.net)","content-type":{"content-type":"text/plain","charset":"Latin_13"},"subject":"ÕÄÖÜŠŽ"});
            test.equal(tree.body, "  ÕÄÖÜŠŽ\n\n\n");

            test.done();
        });
    },

    "M2": function(test){
        loadParserTestFile("M2", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"text/plain"},"content-transfer-encoding":"base64","subject":"M2"});
            test.equal(tree.body, "  M2 \r\n\r\n      Recognize the Content-Transfer-Encoding header field, and decode all\r\n      received data encoded with either the quoted-printable or base64\r\n      implementations. Encode any data sent that is not in seven-bit\r\n      mail-ready representation using one of these transformations and\r\n      include the appropriate Content-Transfer-Encoding header field, unless\r\n      the underlying transport mechanism supports non-seven-bit data, as\r\n      SMTP does not.\r\n\r\n      (Interopabilitet comment: For clarification it is stated that software\r\n      should implement both encodings, and be able to handle mail encoded in\r\n      any of them.)\r\n");

            test.done();
        });
    },

    "M3-1": function(test){
        loadParserTestFile("M3-1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"application/x-paf"},"subject":"M3-1"});
            test.equal(tree.body, "This email is not marked as being text, so a normal user\nshould NOT get this information without a question.\n\n  M3   \n       Recognize and interpret the Content-Type header field, and avoid\n       showing users raw data with a Content-Type field other than text.\n       Be able to send at least text/plain messages, with the character\n       set specified as a parameter if it is not US-ASCII.\n");
            test.ok(tree.attachment);

            test.done();
        });
    },

    "M3-2": function(test){
        loadParserTestFile("M3-2", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"text/plain"},"subject":"M3-2"});
            test.equal(tree.body, "This email is marked as being text, so a normal user\nshould get this information without a question.\n\n  M3   \n       Recognize and interpret the Content-Type header field, and avoid\n       showing users raw data with a Content-Type field other than text.\n       Be able to send at least text/plain messages, with the character\n       set specified as a parameter if it is not US-ASCII.\n");
            test.ok(!tree.attachment);

            test.done();
        });
    },

    "M4.1.1": function(test){
        loadParserTestFile("M4.1.1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"text/plain","charset":"US-ASCII"},"subject":"M4.1.1"});
            test.equal(tree.body, "  M4.1.1\n    Recognize and display \"text\" mail with the character set \"US-ASCII.\" \n\n");

            test.done();
        });
    },

    "M4.1.2": function(test){
        loadParserTestFile("M4.1.2", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"text/plain","charset":"X-PAF"},"subject":"M4.1.2"});
            test.equal(tree.body, "  M4.1.2\n       Recognize other character sets at least to the extent of being able \n       to inform the user about what character set the message uses.   \n");

            test.done();
        });
    },

    "M4.1.3": function(test){
        loadParserTestFile("M4.1.3", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"text/plain","charset":"ISO-8859-7"},"content-transfer-encoding":"quoted-printable","subject":"M4.1.3"});
            test.equal(tree.body, "  This character ------->  Χ\n\n  has decimal value > 127. It should only be visible IF you can\n  show the character set ISO-8859-7. It should be visible as\n  the \"GREEK CAPITAL LETTER CHI\".\n\n  M4.1.3\n       Recognize the \"ISO-8859-*\" character sets to the extent of being able\n       to display those characters that are common to ISO-8859-* and\n       US-ASCII, namely all characters represented by octet values 0-127.\n\n       (Interoperability comment: What glyphs to show for octets in the\n       range 128-255 is up to the software itself.)\n");

            test.done();
        });
    },

    "M4.3.1": function(test){
        loadParserTestFile("M4.3.1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"multipart/mixed","boundary":"this_is_a_boundary"},"subject":"M4.3.1"});

            test.equal(tree.text, "  (This is the first part out of three)\n\n  M4.3.1\n       Recognize the primary (mixed) subtype. Display all relevant\n       information on the message level and the body part header level  \n       and then display or offer to display each of the body parts\n       individually.\n  (This is the second part out of three)\n\n       (Interopability comment: For maximum usage friendliness, we\n       recommend the software to open as few windows as possible, i.e. if\n       the software itself can display several different media-types,\n       parts made up of these types should be shown together without any\n       need for interaction with the user,)\n  (This is the third part out of three)\n\n       Note that even though all three parts is text/plain, it is\n       still three different parts, and this should be visible for\n       the user.\n");

            test.done();
        });
    },

    "M4.3.2": function(test){
        loadParserTestFile("M4.3.2", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"multipart/alternative","boundary":"this_is_a_boundary"},"subject":"M4.3.2"});
            test.equal(tree.text, "  (This is the second part out of two)\n\n  M4.3.2\n       Recognize the \"alternative\" subtype, and avoid showing the user \n       redundant parts of multipart/alternative mail.\n");
            test.deepEqual(tree.attachments, [{"headers":{"content-type":{"content-type":"application/x-unknown"}},"body":"  (This is the first part out of two)\n\n       This text should not be visible for the user, because\n       it exists an alternative part (the second one) which is\n       in format text/plain.\n","attachment":true}]);

            test.done();
        });
    },

    "M4.3.3": function(test){
        loadParserTestFile("M4.3.3", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"multipart/x-foo","boundary":"this_is_a_boundary"},"subject":"M4.3.3"});
            test.equal(tree.text, "  (This is the first part out of two)\n\n  M4.3.3\n       Treat any unrecognized subtypes as if they were \"mixed\".           \n  (This is the second part out of two)\n\n       Note that even though both parts is text/plain, it is\n       still two different parts, and this should be visible for\n       the user.\n\n       Also, this mail should be visible in the same way as\n       4.3.1, even though the multipart subtype is not mixed.\n");

            test.done();
        });
    },

    "M4.4.1": function(test){
        loadParserTestFile("M4.4.1", function(err, data){
            test.ifError(err);
            test.ok(data);

            var mc = mailParser();
            mc.write(data);
            mc.end();

            var tree = mc.getParsedTree();

            test.deepEqual( tree.headers, {"from":"mimetest-human@imc.org","to":"(requester of the test)","mime-version":"1.0","content-type":{"content-type":"application/x-paf"},"content-transfer-encoding":"base64","subject":"M4.4.1"});
            test.deepEqual(tree.body, new Uint8Array([0x20, 0x20, 0x4D, 0x34, 0x2E, 0x34, 0x2E, 0x31, 0xD, 0xA, 0xD, 0xA, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x4F, 0x66, 0x66, 0x65, 0x72, 0x20, 0x74, 0x68, 0x65, 0x20, 0x61, 0x62, 0x69, 0x6C, 0x69, 0x74, 0x79, 0x20, 0x74, 0x6F, 0x20, 0x72, 0x65, 0x6D, 0x6F, 0x76, 0x65, 0x20, 0x65, 0x69, 0x74, 0x68, 0x65, 0x72, 0x20, 0x6F, 0x66, 0x20, 0x74, 0x68, 0x65, 0x20, 0x74, 0x77, 0x6F, 0x20, 0x74, 0x79, 0x70, 0x65, 0x73, 0x20, 0x6F, 0x66, 0xD, 0xA, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x43, 0x6F, 0x6E, 0x74, 0x65, 0x6E, 0x74, 0x2D, 0x54, 0x72, 0x61, 0x6E, 0x73, 0x66, 0x65, 0x72, 0x2D, 0x45, 0x6E, 0x63, 0x6F, 0x64, 0x69, 0x6E, 0x67, 0x20, 0x64, 0x65, 0x66, 0x69, 0x6E, 0x65, 0x64, 0x20, 0x69, 0x6E, 0x20, 0x52, 0x46, 0x43, 0x2D, 0x38, 0x32, 0x32, 0x20, 0x61, 0x6E, 0x64, 0x20, 0x70, 0x75, 0x74, 0x20, 0x74, 0x68, 0x65, 0x20, 0x72, 0x65, 0x73, 0x75, 0x6C, 0x74, 0x69, 0x6E, 0x67, 0xD, 0xA, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x69, 0x6E, 0x66, 0x6F, 0x72, 0x6D, 0x61, 0x74, 0x69, 0x6F, 0x6E, 0x20, 0x69, 0x6E, 0x20, 0x61, 0x20, 0x75, 0x73, 0x65, 0x72, 0x20, 0x66, 0x69, 0x6C, 0x65, 0x2E, 0xD, 0xA]));

            test.done();
        });
    }

};