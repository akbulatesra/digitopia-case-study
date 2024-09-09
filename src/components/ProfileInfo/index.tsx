import useErrorListener from '@/hooks/useErrorListener';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import BadgeIcon from '@mui/icons-material/Badge';
import FactoryIcon from '@mui/icons-material/Factory';
import PublicIcon from '@mui/icons-material/Public';
import {
  useGetCountryListQuery,
  useGetIndustryListQuery,
  useLazyGetOrganizationDetailQuery,
} from '@/services';
import {
  Typography,
  Box,
  Avatar,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Divider,
  styled,
  Button,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { setCountries } from '@/redux/slices/countrySlice';
import { setIndustries } from '@/redux/slices/industrySlice';
import { useTranslations } from 'next-intl';
import { Logout } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/redux/slices/userSlice';

const StyledIcon = styled(ListItemIcon)({
  minWidth: 40,
});

const ProfileInfo = ({ close }: { close: () => void }) => {
  const { organizationId, name, familyName } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const t = useTranslations('profileInfo');
  const { error, data: IndustryListData } = useGetIndustryListQuery();
  const { data: CountryListData } = useGetCountryListQuery();
  const [trigger, { data }] = useLazyGetOrganizationDetailQuery();
  const router = useRouter();

  const filteredIndustry = useMemo(() => {
    return IndustryListData?.find(
      (industry) => industry.id === data?.industryId
    );
  }, [IndustryListData, data]);

  const filteredCountry = useMemo(() => {
    return CountryListData?.find((country) => country.id === data?.countryId);
  }, [IndustryListData, data]);

  const handleLogout = () => {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('idToken', '');
    dispatch(clearUser());
    close();
    router.push('/');
  };

  useEffect(() => {
    if (CountryListData) dispatch(setCountries(CountryListData));
    if (IndustryListData) dispatch(setIndustries(IndustryListData));
    if (organizationId) trigger({ organizationId });
  }, [IndustryListData, CountryListData, organizationId, trigger, dispatch]);

  useErrorListener(error);
  return (
    <Box p={2} display="flex" flexDirection="column" height="100%">
      <Avatar
        sx={{ width: 50, height: 50, marginX: 'auto', marginBottom: 1 }}
      />
      <Typography
        textAlign="center"
        fontSize={24}
      >{`${name} ${familyName}`}</Typography>
      <Box
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
        paddingX={2}
        paddingY={1}
        marginTop={2}
        borderRadius={4}
      >
        <Typography mb={0.5} fontSize={20}>
          {t('organizationInfo')}
        </Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
            <StyledIcon>
              <BadgeIcon color="secondary" />
            </StyledIcon>
            <ListItemText>{data?.name}</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <StyledIcon>
              <FactoryIcon />
            </StyledIcon>
            <ListItemText>{filteredIndustry?.name}</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <StyledIcon>
              <PublicIcon color="primary" />
            </StyledIcon>
            <ListItemText>{filteredCountry?.name}</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Button
        sx={{ marginTop: 'auto', marginLeft: 'auto' }}
        endIcon={<Logout />}
        onClick={handleLogout}
      ></Button>
    </Box>
  );
};
export default ProfileInfo;
