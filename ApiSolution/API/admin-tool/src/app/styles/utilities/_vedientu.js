import { makeStyles, withStyles } from '@material-ui/core/styles'

export const vedientuStyles = makeStyles(({ palette, ...theme }) => ({
    '@global': {
        // 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section':
        //     {
        //         display: 'block',
        //     },
        // hr: {
        //     '-webkit-box-sizing': 'content-box',
        //     'box-sizing': 'content-box',
        //     height: 0,
        //     overflow: 'visible',
        // },
        'h3,h4': {
            color: 'blue',
        },
        input: {},
    },
}))
