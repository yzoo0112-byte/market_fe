// Header.tsx
import { AppBar, Toolbar, Box, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function Header() {
    return (
        <AppBar position="static" className="bg-gray-800 shadow-none">
            <Toolbar className="flex justify-between items-center px-4">
                {/* Logo */}
                <Typography variant="h6" noWrap component="div" className="text-white font-bold">
                    로고
                </Typography>

                {/* Search Bar */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon className="text-gray-400" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="검색어를 입력하세요"
                        inputProps={{ 'aria-label': 'search' }}
                        className="text-white"
                    />
                </Search>

                {/* Login/Profile */}
                <Box className="flex items-center space-x-2">
                    <Typography className="text-white text-sm">
                        로그인/로그아웃
                    </Typography>
                    <AccountCircleIcon className="text-white" />
                </Box>
            </Toolbar>
        </AppBar>
    );
}