import request from 'request'
import fs 		 from 'fs'
import cheerio from 'cheerio'

saveMediumPostsDataFrom('fasthacks')

async function saveMediumPostsDataFrom(username) {
	let mediumUrl = `https://medium.com/@${username}/latest?count=1000`
	let data = await scrapeMedium(mediumUrl)
	fs.writeFile('./data.json', JSON.stringify(data, null, 4), err => {
    if (err) throw err
	})
}

function scrapeMedium(mediumUrl) {
	return new Promise((accept, reject) => {
		request(mediumUrl, (error, response, html) => {
	    if(!error){
        let $ = cheerio.load(html);
        let posts = []

        let mediumPostsHtml = $('.blockGroup-list').children()

        mediumPostsHtml.each((i, el) => {
        	let data = {}
       		data.date = $('span.postMetaInline').eq(i).children().first().text()
       		data.url = $('article').eq(i).children().first().attr('href') //$('span.postMetaInline').eq(i).children().first().attr('href')
       		data.title = $('.section-inner').eq(i).children().get(0).tagName === 'figure' ?
       			$('.section-inner').eq(i).children().first().next().text() // for publications
       			: $('.section-inner').eq(i).children().first().text()      // for regular posts
       		data.image = $('.graf-image').eq(i).attr('src')
       		data.content = $('.section-inner').eq(i).children().last().text()
          data.likes = parseInt($('.button--chromeless[data-action=show-recommends]').eq(i).text()) // || 0
       		posts.push(data)
        })
        return accept(posts)
	    }
		})
	})
}
