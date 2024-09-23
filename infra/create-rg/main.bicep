targetScope = 'subscription'

@description('Resource group name')
param resourceGroupName string = 'myResourceGroup'

@allowed([
  'japaneast'
  'eastus'
  'westus'
  'northcentralus'
  'swedencentral'
])
@description('Location for Resource group.')
param location string = 'japaneast'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}
