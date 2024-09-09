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
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { setCountries } from '@/redux/slices/countrySlice';
import { setIndustries } from '@/redux/slices/industrySlice';

const ProfileInfo = () => {
  const { organizationId, name, familyName } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const { error, data: IndustryListData } = useGetIndustryListQuery();
  const { data: CountryListData } = useGetCountryListQuery();
  const [trigger, { data }] = useLazyGetOrganizationDetailQuery();

  const filteredIndustry = useMemo(() => {
    return IndustryListData?.find(
      (industry) => industry.id === data?.industryId
    );
  }, [IndustryListData, data]);

  const filteredCountry = useMemo(() => {
    return CountryListData?.find((country) => country.id === data?.countryId);
  }, [IndustryListData, data]);

  useEffect(() => {
    if (CountryListData) dispatch(setCountries(CountryListData));
    if (IndustryListData) dispatch(setIndustries(IndustryListData));
    if (organizationId) trigger({ organizationId });
  }, [IndustryListData, CountryListData, organizationId, trigger, dispatch]);

  useErrorListener(error);
  return (
    <Box p={2}>
      <Avatar />
      <Typography>{`${name} ${familyName}`}</Typography>
      <Typography>{`Organization Info`}</Typography>
      <List>
        <ListItem disableGutters disablePadding>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText>{data?.name}</ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <ListItemIcon>
            <FactoryIcon />
          </ListItemIcon>
          <ListItemText>{filteredIndustry?.name}</ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText>{filteredCountry?.name}</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};
export default ProfileInfo;
