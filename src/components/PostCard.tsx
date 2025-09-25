// // src/components/PostCard.js
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';

// const PostCard = ({ post }) => {
//     return (
//         <Card sx={{
//             minHeight: 200,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between'
//         }}>
//             <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                     {post.title}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     작성자: {post.author} | 날짜: {post.date}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {post.content.length > 100
//                         ? `${post.content.substring(0, 100)}...`
//                         : post.content}
//                 </Typography>
//             </CardContent>
//             <CardActions sx={{ justifyContent: 'flex-end' }}>
//                 <Button size="small">자세히 보기</Button>
//             </CardActions>
//         </Card>
//     );
// };

// export default PostCard;