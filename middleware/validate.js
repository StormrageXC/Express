function parseText(texts) {
    return texts.split(/\[|\]/).filter(e => e);
}

function getText(req, texts) {
    let val = req.body;
    texts.forEach(key => {
        val = val[key];
    });
    return val;
}
exports.require = (texts) => {
    texts = parseText(texts);
    return (req, res, next) => {
        if (getText(req, texts)) {
            next();
        } else {
            res.error("Title is required")
            res.redirect('back');
        }
    }
}
exports.lengthAbove = (texts, len) => {
    texts = parseText(texts);
    return (req, res, next) => {
        if (getText(req, texts).length > len) {
            next();
        } else {
            res.redirect('back');
        }
    }
}